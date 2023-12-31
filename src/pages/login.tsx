import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { authOptions } from './api/auth/[...nextauth]';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      some: '',
    },
  };
};

function Login() {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login | Bookie</title>
      </Head>
      <nav className={`border-gray-200 bg-gray-200`}>
        <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-8 py-6 ">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-stretch">
              <svg
                width="140"
                height="32"
                viewBox="0 0 140 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 0C2.68629 0 0 2.68629 0 6V26C0 29.3137 2.68629 32 6 32H26C29.3137 32 32 29.3137 32 26V6C32 2.68629 29.3137 0 26 0H6ZM10.4615 8.00001C12.1792 7.99751 13.8613 8.48027 15.3077 9.3908V24C13.9905 22.9304 12.3031 22.289 10.4615 22.289C9.59692 22.2879 8.73846 22.4318 7.92308 22.7144C7.81866 22.7507 7.70692 22.7619 7.59722 22.7469C7.48752 22.732 7.38307 22.6914 7.29264 22.6285C7.20221 22.5657 7.12844 22.4825 7.07752 22.3858C7.0266 22.2891 7.00002 22.1819 7 22.073V9.14494C7.00002 9.00425 7.04441 8.86702 7.12707 8.75215C7.20972 8.63728 7.32658 8.55042 7.46154 8.50352C8.42514 8.16926 9.43968 7.99898 10.4615 8.00001ZM21.5385 22.289C19.7694 22.2862 18.0551 22.8915 16.6923 24V9.3908C18.1387 8.48027 19.8208 7.99751 21.5385 8.00001C22.5603 7.99898 23.5749 8.16926 24.5385 8.50352C24.6734 8.55042 24.7903 8.63728 24.8729 8.75215C24.9556 8.86702 25 9.00425 25 9.14494V22.073C25.0001 22.182 24.9737 22.2893 24.9228 22.3861C24.8719 22.4829 24.7982 22.5662 24.7077 22.6292C24.6173 22.6921 24.5128 22.7328 24.403 22.7478C24.2932 22.7628 24.1814 22.7517 24.0769 22.7154C23.2831 22.4396 22.4302 22.289 21.5385 22.289Z"
                  fill="#10B981"
                />
                <path
                  d="M41.8963 27V5.18182H46.4347V13.3849H46.5732C46.772 12.9446 47.0597 12.4972 47.4361 12.0426C47.8196 11.581 48.3168 11.1974 48.9276 10.892C49.5455 10.5795 50.3125 10.4233 51.2287 10.4233C52.4219 10.4233 53.5227 10.7358 54.5312 11.3608C55.5398 11.9787 56.3459 12.9126 56.9496 14.1626C57.5533 15.4055 57.8551 16.9645 57.8551 18.8395C57.8551 20.6648 57.5604 22.206 56.9709 23.4631C56.3885 24.7131 55.593 25.6612 54.5845 26.3075C53.5831 26.9467 52.4609 27.2663 51.218 27.2663C50.3374 27.2663 49.5881 27.1207 48.9702 26.8295C48.3594 26.5384 47.8587 26.1726 47.468 25.7322C47.0774 25.2848 46.7791 24.8338 46.5732 24.3793H46.3707V27H41.8963ZM46.3388 18.8182C46.3388 19.7912 46.4737 20.6399 46.7436 21.3643C47.0135 22.0888 47.4041 22.6534 47.9155 23.0582C48.4268 23.456 49.0483 23.6548 49.7798 23.6548C50.5185 23.6548 51.1435 23.4524 51.6548 23.0476C52.1662 22.6357 52.5533 22.0675 52.8161 21.343C53.0859 20.6115 53.2209 19.7699 53.2209 18.8182C53.2209 17.8736 53.0895 17.0426 52.8267 16.3253C52.5639 15.608 52.1768 15.0469 51.6655 14.642C51.1541 14.2372 50.5256 14.0348 49.7798 14.0348C49.0412 14.0348 48.4162 14.2301 47.9048 14.6207C47.4006 15.0114 47.0135 15.5653 46.7436 16.2827C46.4737 17 46.3388 17.8452 46.3388 18.8182ZM68.2768 27.3196C66.622 27.3196 65.1909 26.968 63.9835 26.2649C62.7832 25.5547 61.8564 24.5675 61.2029 23.3033C60.5495 22.032 60.2228 20.5582 60.2228 18.8821C60.2228 17.1918 60.5495 15.7145 61.2029 14.4503C61.8564 13.179 62.7832 12.1918 63.9835 11.4886C65.1909 10.7784 66.622 10.4233 68.2768 10.4233C69.9316 10.4233 71.3592 10.7784 72.5595 11.4886C73.7669 12.1918 74.6973 13.179 75.3507 14.4503C76.0041 15.7145 76.3308 17.1918 76.3308 18.8821C76.3308 20.5582 76.0041 22.032 75.3507 23.3033C74.6973 24.5675 73.7669 25.5547 72.5595 26.2649C71.3592 26.968 69.9316 27.3196 68.2768 27.3196ZM68.2981 23.804C69.051 23.804 69.6795 23.5909 70.1838 23.1648C70.688 22.7315 71.068 22.142 71.3237 21.3963C71.5865 20.6506 71.7179 19.8018 71.7179 18.8501C71.7179 17.8984 71.5865 17.0497 71.3237 16.304C71.068 15.5582 70.688 14.9687 70.1838 14.5355C69.6795 14.1023 69.051 13.8857 68.2981 13.8857C67.5382 13.8857 66.899 14.1023 66.3805 14.5355C65.8691 14.9687 65.4821 15.5582 65.2193 16.304C64.9636 17.0497 64.8358 17.8984 64.8358 18.8501C64.8358 19.8018 64.9636 20.6506 65.2193 21.3963C65.4821 22.142 65.8691 22.7315 66.3805 23.1648C66.899 23.5909 67.5382 23.804 68.2981 23.804ZM86.6752 27.3196C85.0204 27.3196 83.5893 26.968 82.3819 26.2649C81.1816 25.5547 80.2548 24.5675 79.6014 23.3033C78.948 22.032 78.6213 20.5582 78.6213 18.8821C78.6213 17.1918 78.948 15.7145 79.6014 14.4503C80.2548 13.179 81.1816 12.1918 82.3819 11.4886C83.5893 10.7784 85.0204 10.4233 86.6752 10.4233C88.3301 10.4233 89.7576 10.7784 90.9579 11.4886C92.1653 12.1918 93.0957 13.179 93.7491 14.4503C94.4025 15.7145 94.7292 17.1918 94.7292 18.8821C94.7292 20.5582 94.4025 22.032 93.7491 23.3033C93.0957 24.5675 92.1653 25.5547 90.9579 26.2649C89.7576 26.968 88.3301 27.3196 86.6752 27.3196ZM86.6966 23.804C87.4494 23.804 88.0779 23.5909 88.5822 23.1648C89.0865 22.7315 89.4664 22.142 89.7221 21.3963C89.9849 20.6506 90.1163 19.8018 90.1163 18.8501C90.1163 17.8984 89.9849 17.0497 89.7221 16.304C89.4664 15.5582 89.0865 14.9687 88.5822 14.5355C88.0779 14.1023 87.4494 13.8857 86.6966 13.8857C85.9366 13.8857 85.2974 14.1023 84.7789 14.5355C84.2676 14.9687 83.8805 15.5582 83.6177 16.304C83.362 17.0497 83.2342 17.8984 83.2342 18.8501C83.2342 19.8018 83.362 20.6506 83.6177 21.3963C83.8805 22.142 84.2676 22.7315 84.7789 23.1648C85.2974 23.5909 85.9366 23.804 86.6966 23.804ZM101.792 22.2912L101.803 16.8473H102.464L107.705 10.6364H112.915L105.873 18.8608H104.797L101.792 22.2912ZM97.6802 27V5.18182H102.219V27H97.6802ZM107.907 27L103.092 19.8729L106.118 16.6662L113.224 27H107.907ZM115.141 27V10.6364H119.68V27H115.141ZM117.421 8.52699C116.746 8.52699 116.167 8.30327 115.684 7.85582C115.209 7.40128 114.971 6.85795 114.971 6.22585C114.971 5.60085 115.209 5.06463 115.684 4.61719C116.167 4.16264 116.746 3.93537 117.421 3.93537C118.096 3.93537 118.671 4.16264 119.147 4.61719C119.63 5.06463 119.871 5.60085 119.871 6.22585C119.871 6.85795 119.63 7.40128 119.147 7.85582C118.671 8.30327 118.096 8.52699 117.421 8.52699ZM130.772 27.3196C129.089 27.3196 127.64 26.9787 126.426 26.2969C125.218 25.608 124.288 24.6349 123.635 23.3778C122.981 22.1136 122.654 20.6186 122.654 18.8928C122.654 17.2095 122.981 15.7322 123.635 14.4609C124.288 13.1896 125.208 12.1989 126.394 11.4886C127.587 10.7784 128.986 10.4233 130.591 10.4233C131.671 10.4233 132.676 10.5973 133.606 10.9453C134.544 11.2862 135.36 11.8011 136.056 12.4901C136.76 13.179 137.306 14.0455 137.697 15.0895C138.088 16.1264 138.283 17.3409 138.283 18.733V19.9794H124.466V17.1669H134.011C134.011 16.5135 133.869 15.9347 133.585 15.4304C133.301 14.9261 132.907 14.532 132.402 14.2479C131.905 13.9567 131.326 13.8111 130.666 13.8111C129.977 13.8111 129.366 13.9709 128.833 14.2905C128.308 14.603 127.896 15.0256 127.598 15.5582C127.299 16.0838 127.147 16.6697 127.14 17.3161V19.9901C127.14 20.7997 127.289 21.4993 127.587 22.0888C127.892 22.6783 128.322 23.1328 128.876 23.4524C129.43 23.772 130.087 23.9318 130.847 23.9318C131.351 23.9318 131.813 23.8608 132.232 23.7188C132.651 23.5767 133.01 23.3636 133.308 23.0795C133.606 22.7955 133.833 22.4474 133.99 22.0355L138.187 22.3125C137.974 23.321 137.537 24.2017 136.877 24.9545C136.223 25.7003 135.378 26.2827 134.341 26.7017C133.311 27.1136 132.122 27.3196 130.772 27.3196Z"
                  fill="#111827"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
      <section className={`${inter.className} py-20`}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0  overflow-hidden">
            {router.query.error === 'OAuthAccountNotLinked' && (
              <div
                id="toast-danger"
                className={`${inter.className} flex items-center w-full max-w-lg p-4 rounded-lg shadow text-red-400 border-2 border-red-700/75 bg-red-700/20`}
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Error icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  Email with that account has been used. Try another
                </div>
              </div>
            )}
            <div className="p-6 space-y-2 mt-8 md:space-y-6 sm:p-8 border border-gray-800/30 rounded-lg">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                Sign in to your account
              </h1>

              <div className="h-[1px] w-full bg-gray-800/30 scale-x-150"></div>

              <div className="space-y-2">
                <button
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  type="button"
                  className="text-white bg-[#24292F] hover:bg-[#24292F]/90 hover:ring-2 hover:outline-none hover:ring-gray-400/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full justify-center mr-2 mb-2"
                >
                  <svg
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2 -ml-1"
                  >
                    <g clipPath="url(#clip0_13183_10121)">
                      <path
                        d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                        fill="#3F83F8"
                      ></path>
                      <path
                        d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                        fill="#FBBC04"
                      ></path>
                      <path
                        d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                        fill="#EA4335"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_13183_10121">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  Sign in with Google
                </button>
                <button
                  onClick={() => signIn('github', { callbackUrl: '/' })}
                  type="button"
                  className="text-white bg-[#24292F] hover:bg-[#24292F]/90 hover:ring-2 hover:outline-none hover:ring-gray-400/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full justify-center mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                  Sign in with Github
                </button>
              </div>

              <div className="h-[1px] w-full bg-gray-800/20"></div>

              <div className="px-8">
                <p className="text-center text-xs text-gray-400 leading-normal">
                  By signing-in, you agree to {`Bookie's`}{' '}
                  <strong>Terms and Conditions of use</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
