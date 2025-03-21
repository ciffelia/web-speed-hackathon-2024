import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  height: auto;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image alt="Cyber TOON" decoding="async" height={576} src="/assets/hero.png" width={1024} />
    </_Wrapper>
  );
};
