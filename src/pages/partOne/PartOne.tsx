import { ConfigProvider, theme } from "antd";
import { Container } from "../../components/util/Container";
import { BackBtn } from "../../components/util/BackBtn";

const PartOne = () => {
  return (
    <div>
      <BackBtn />
      <Container className="max-w-lg">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        ></ConfigProvider>
      </Container>
    </div>
  );
};

export default PartOne;
