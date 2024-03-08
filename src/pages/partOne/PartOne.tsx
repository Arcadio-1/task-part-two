import { ConfigProvider, theme } from "antd";
import { Container } from "../../components/util/Container";
import { BackBtn } from "../../components/util/BackBtn";
import { CatModal } from "../../components/partOne/CatModal";
import { BaseForm } from "../../components/partOne/BaseForm";

const PartOne = () => {
  return (
    <div>
      <BackBtn />
      <Container className="max-w-lg">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <BaseForm />
          <CatModal />
        </ConfigProvider>
      </Container>
    </div>
  );
};

export default PartOne;
