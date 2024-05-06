import { Center } from '@mantine/core';
import { NavIcon } from '../../../interfaces/NavIcon';

export function DashBoardIcon({ active }: NavIcon) {
  let color = '#999';

  if (active) {
    color = '#0855A3';
  }

  return (
    <Center style={{ color: color }}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99985 19.3664V14.3664H13.9999V19.3664C13.9999 19.9164 14.4499 20.3664 14.9999 20.3664H17.9999C18.5499 20.3664 18.9999 19.9164 18.9999 19.3664V12.3664H20.6999C21.1599 12.3664 21.3799 11.7964 21.0299 11.4964L12.6699 3.96643C12.2899 3.62643 11.7099 3.62643 11.3299 3.96643L2.96985 11.4964C2.62985 11.7964 2.83985 12.3664 3.29985 12.3664H4.99985V19.3664C4.99985 19.9164 5.44985 20.3664 5.99985 20.3664H8.99985C9.54985 20.3664 9.99985 19.9164 9.99985 19.3664Z"
          fill="currentColor"
        />
      </svg>
    </Center>
  );
}
