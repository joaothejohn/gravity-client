import { ChartBarIcon, ExclamationTriangleIcon, GlobeAltIcon, PowerIcon, BoltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import app from "@/lib/app";
import { IRadiusUserResponse } from "types";
import { useTranslation } from "react-i18next";
import RadiusUserButtons from '../shared/RadiusUserButtons';

interface RadiusUserCardProps {
  user: IRadiusUserResponse;
}

const RadiusUserCard: React.FC<RadiusUserCardProps> = ({ user }) => {
  const { t } = useTranslation('common');

  const handleStatus = (isActive: boolean) => {
    if (isActive) {
      return (
        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-green-600 text-sm font-medium text-white select-none">
          <PowerIcon className="w-5 h-5 mr-2" /> {t('plan-active')}
        </span>
      )
    }

    return (
      <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-600 text-sm font-medium text-white select-none">
        <ExclamationTriangleIcon className="w-5 h-5 mr-2" /> {t('plan-not-active')}
      </span>
    )
  }

  return (
    <div className="w-2/4 p-4">
      <div className="relative mx-auto w-full">
        <a href="#" className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
          <div className="shadow p-4 rounded-lg bg-gray-50">
            <div className="flex justify-center relative rounded-lg overflow-hidden h-30">
              <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                <Image
                  src="https://picsum.photos/790/65/?blur=10"
                  alt={app.name}
                  width={790}
                  height={360}
                />
              </div>
              <div className="absolute flex top-3 right-3 mb-3 inline-flex rounded-lg z-10 bg-black text-sm font-medium text-white select-none">
                <RadiusUserButtons />
              </div>
              {handleStatus(user.isActive)}
            </div>
            <div className="mt-4">
              <div className="flex">
                <BoltIcon className="w-6 h-6 mr-2" />
                <p className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">
                  Current Plan:
                </p>
                <h2 className="ml-2 font-small text-base md:text-lg text-gray-800 line-clamp-1">
                  {user.plan.name}
                </h2>
              </div>
            </div>
            <div className="flex mt-3">
              <GlobeAltIcon className="w-6 h-6 mr-2" />
              <p className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">Current IP:</p>
              <span className="mt-1 ml-2">
                {user.ip}
              </span>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Max Limit:</span>
                <span className="mt-2 ml-2 xl:mt-0">
                  {user.plan.maxLimit}
                </span>
              </p>
              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Limit At:</span>
                <span className="mt-2 ml-2 xl:mt-0">
                  {user.plan.limitAt}
                </span>
              </p>
              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Burst Limit:</span>
                <span className="mt-2 ml-2 xl:mt-0">
                  {user.plan.burstLimit}
                </span>
              </p>
              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Burst Threshold:</span>
                <span className="mt-2 ml-2 xl:mt-0">
                  {user.plan.burstThreshold}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 mt-8">
              <div className="flex items-center">
                <div className="relative">
                  <Image
                    src="https://picsum.photos/102"
                    alt={app.name}
                    className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200"
                    width={640}
                    height={360}
                  />
                  <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-primary-red rounded-full"></span>
                </div>

                <p className="ml-2 font-medium text-gray-800 line-clamp-1">
                  {user.username}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default RadiusUserCard;
