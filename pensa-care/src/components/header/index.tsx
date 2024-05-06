import { Title } from '@mantine/core';

export function Header({ title }: { title: string }) {
  return (
    <Title mb={32} size={'h2'} c="#112F59">
      {title}
    </Title>
  );
}
