import { Center, Image } from '@mantine/core';

import pensaCareIcon from '../../assets/icons/pensacare.svg';

interface ILogo {
  mt?: string | number;
  mb?: string | number;
}

export function Logo({ mt = 60, mb = '120px' }: ILogo) {
  return (
    <Center>
      <Image
        mt={mt}
        mb={mb}
        src={pensaCareIcon}
        styles={{ root: { width: '100px' } }}
      />
    </Center>
  );
}
