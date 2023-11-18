import { AuthLayout } from '@/components/layouts';
import { InputWithLabel } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { useFormik } from 'formik';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, type ReactElement, useState } from 'react';
import { Button } from 'react-daisyui';
import toast from 'react-hot-toast';
import type { ApiResponse, NextPageWithLayout } from 'types';
import * as Yup from 'yup';
import GoogleReCAPTCHA from '@/components/shared/GoogleReCAPTCHA';
import ReCAPTCHA from 'react-google-recaptcha';
import env from '@/lib/env';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import cookie from 'cookie';

const ForgotPassword: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recaptchaSiteKey }) => {
  const { t } = useTranslation('common');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
    }),
    onSubmit: async (values) => {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          ...values,
          recaptchaToken,
        }),
      });

      const json = (await response.json()) as ApiResponse;

      formik.resetForm();
      recaptchaRef.current?.reset();

      if (!response.ok) {
        toast.error(json.error.message);
        return;
      }

      toast.success(t('password-reset-link-sent'));
    },
  });

  return (
    <>
      <Head>
        <title>{t('forgot-password-title')}</title>
      </Head>
      <div className="rounded p-6 border">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <InputWithLabel
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              error={formik.touched.email ? formik.errors.email : undefined}
              onChange={formik.handleChange}
            />
            <GoogleReCAPTCHA
              recaptchaRef={recaptchaRef}
              onChange={setRecaptchaToken}
              siteKey={recaptchaSiteKey}
            />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              color="primary"
              loading={formik.isSubmitting}
              active={formik.dirty}
              fullWidth
              size="md"
            >
              {t('email-password-reset-link')}
            </Button>
          </div>
        </form>
      </div>
      <p className="text-center text-sm text-gray-600">
        {t('already-have-an-account')}
        <Link
          href="/auth/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          &nbsp;{t('sign-in')}
        </Link>
      </p>
    </>
  );
};

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout heading="Reset Password">{page}</AuthLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, locale }: GetServerSidePropsContext = context;
  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
      recaptchaSiteKey: env.recaptcha.siteKey,
    },
  };
};

export default ForgotPassword;
