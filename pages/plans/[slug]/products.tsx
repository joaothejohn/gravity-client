import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types';
import cookie from 'cookie';

const Products: NextPageWithLayout = () => {
  return (
    <div className="p-3">
      <p className="text-sm">
        This is just a placeholder for the products page.
      </p>
    </div>
  );
};

export async function getServerSideProps({
  req, locale
}: GetServerSidePropsContext) {
  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
    },
  };
}

export default Products;
