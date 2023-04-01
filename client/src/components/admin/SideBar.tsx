import Link from "next/link";
import { useRouter } from "next/router";

const SideBar: React.FC = () => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <div className="w-64 sticky top-0 left-0 h-full flex flex-col">
      <div className="border-r text-center py-5">
        <Link href="/admin">
          <a className="font-bold uppercase">Admin panel</a>
        </Link>
      </div>
      <div className="border-r border-y flex-1 pb-5">
        <div className="mt-6">
          <div className="text-gray-500 pl-4">Списки</div>
          <Link href="/admin/users">
            <a
              className={`pl-6 py-2 mt-3 flex gap-3 transition-colors child:child:transition-colors child:child:hover:stroke-white hover:text-white hover:bg-maingreen ${
                pathName.includes("/admin/users")
                  ? "bg-maingreen text-white"
                  : ""
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19.128C15.853 19.3757 16.7368 19.5009 17.625 19.5C19.0534 19.5021 20.4633 19.1764 21.746 18.548C21.7839 17.6517 21.5286 16.7675 21.0188 16.0293C20.509 15.2912 19.7724 14.7394 18.9207 14.4575C18.0691 14.1757 17.1487 14.1791 16.2992 14.4674C15.4497 14.7557 14.7173 15.313 14.213 16.055M15 19.128V19.125C15 18.012 14.715 16.965 14.214 16.055M15 19.128V19.234C13.0755 20.3931 10.8706 21.0038 8.62402 21C6.29302 21 4.11202 20.355 2.25002 19.234L2.24902 19.125C2.24826 17.7095 2.71864 16.3339 3.58601 15.2153C4.45338 14.0966 5.6684 13.2984 7.03951 12.9466C8.41063 12.5948 9.85985 12.7093 11.1587 13.2721C12.4575 13.8349 13.5321 14.814 14.213 16.055M12 6.375C12 7.27011 11.6444 8.12855 11.0115 8.76149C10.3786 9.39442 9.52013 9.75 8.62502 9.75C7.72992 9.75 6.87147 9.39442 6.23854 8.76149C5.6056 8.12855 5.25002 7.27011 5.25002 6.375C5.25002 5.47989 5.6056 4.62145 6.23854 3.98851C6.87147 3.35558 7.72992 3 8.62502 3C9.52013 3 10.3786 3.35558 11.0115 3.98851C11.6444 4.62145 12 5.47989 12 6.375V6.375ZM20.25 8.625C20.25 9.32119 19.9735 9.98887 19.4812 10.4812C18.9889 10.9734 18.3212 11.25 17.625 11.25C16.9288 11.25 16.2612 10.9734 15.7689 10.4812C15.2766 9.98887 15 9.32119 15 8.625C15 7.92881 15.2766 7.26113 15.7689 6.76884C16.2612 6.27656 16.9288 6 17.625 6C18.3212 6 18.9889 6.27656 19.4812 6.76884C19.9735 7.26113 20.25 7.92881 20.25 8.625V8.625Z"
                  stroke={pathName.includes("/admin/users") ? "white" : "black"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Пользователи
            </a>
          </Link>

          <Link href="/admin/tea">
            <a
              className={`pl-6 py-2 mt-3 flex gap-3 transition-colors child:child:transition-colors child:child:hover:stroke-white hover:text-white hover:bg-maingreen ${
                pathName.includes("/admin/tea") ? "bg-maingreen text-white" : ""
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5001 21V13.5C13.5001 13.3011 13.5791 13.1103 13.7198 12.9697C13.8604 12.829 14.0512 12.75 14.2501 12.75H17.2501C17.449 12.75 17.6398 12.829 17.7804 12.9697C17.9211 13.1103 18.0001 13.3011 18.0001 13.5V21M13.5001 21H2.36011M13.5001 21H18.0001M18.0001 21H21.6401M20.2501 21V9.349M3.75011 20.999V9.35M3.75011 9.35C4.35013 9.69598 5.05136 9.82376 5.73486 9.71167C6.41835 9.59958 7.04203 9.25451 7.50011 8.735C7.78141 9.05445 8.12761 9.31022 8.51561 9.48525C8.9036 9.66028 9.32447 9.75054 9.75011 9.75C10.6461 9.75 11.4501 9.357 12.0001 8.734C12.2813 9.05363 12.6275 9.30959 13.0155 9.48479C13.4035 9.66 13.8244 9.75041 14.2501 9.75C15.1461 9.75 15.9501 9.357 16.5001 8.734C16.9583 9.25335 17.5821 9.59822 18.2656 9.71013C18.949 9.82204 19.6502 9.6941 20.2501 9.348M3.75011 9.348C3.35215 9.11735 3.01246 8.79839 2.75725 8.41571C2.50204 8.03304 2.33811 7.59686 2.27811 7.14082C2.21811 6.68477 2.26364 6.22104 2.41118 5.78537C2.55873 5.3497 2.80435 4.95374 3.12911 4.628L4.31811 3.44C4.59915 3.15862 4.98042 3.00035 5.37811 3H18.6211C19.0188 3.00035 19.4001 3.15862 19.6811 3.44L20.8711 4.629C21.1966 4.95436 21.4429 5.35026 21.5909 5.78605C21.7389 6.22184 21.7847 6.68584 21.7247 7.14215C21.6646 7.59846 21.5004 8.03484 21.2447 8.41751C20.989 8.80019 20.6487 9.11891 20.2501 9.349M6.75011 17.999H10.5001C10.699 17.999 10.8898 17.92 11.0304 17.7793C11.1711 17.6387 11.2501 17.4479 11.2501 17.249V13.5C11.2501 13.3011 11.1711 13.1103 11.0304 12.9697C10.8898 12.829 10.699 12.75 10.5001 12.75H6.75011C6.5512 12.75 6.36043 12.829 6.21978 12.9697C6.07913 13.1103 6.00011 13.3011 6.00011 13.5V17.25C6.00011 17.665 6.33611 18 6.75011 18V17.999Z"
                  stroke={pathName.includes("/admin/tea") ? "white" : "black"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Товары
            </a>
          </Link>

          <Link href="/admin/orders">
            <a
              className={`pl-6 py-2 mt-3 flex gap-3 transition-colors child:child:transition-colors child:child:hover:stroke-white hover:text-white hover:bg-maingreen ${
                pathName.includes("/admin/orders")
                  ? "bg-maingreen text-white"
                  : ""
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 8.25H21.75M2.25 9H21.75M5.25 14.25H11.25M5.25 16.5H8.25M4.5 19.5H19.5C20.0967 19.5 20.669 19.2629 21.091 18.841C21.5129 18.419 21.75 17.8467 21.75 17.25V6.75C21.75 6.15326 21.5129 5.58097 21.091 5.15901C20.669 4.73705 20.0967 4.5 19.5 4.5H4.5C3.90326 4.5 3.33097 4.73705 2.90901 5.15901C2.48705 5.58097 2.25 6.15326 2.25 6.75V17.25C2.25 17.8467 2.48705 18.419 2.90901 18.841C3.33097 19.2629 3.90326 19.5 4.5 19.5Z"
                  stroke={
                    pathName.includes("/admin/orders") ? "white" : "black"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Заказы
            </a>
          </Link>

          <Link href="/admin/categories">
            <a
              className={`pl-6 py-2 mt-3 flex gap-3 transition-colors child:child:transition-colors child:child:hover:stroke-white hover:text-white hover:bg-maingreen ${
                pathName.includes("/admin/categories")
                  ? "bg-maingreen text-white"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              Категории
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
