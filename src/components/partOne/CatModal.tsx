import { Button, ColorPicker, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CategorySchema } from "./lib/validation";
import { useCategoryStore } from "./lib/useCategoryStore";
import { lowLevelRegex } from "./lib/types";
import { rgbaObjcetToRgbaString } from "./actions/rgbaObjcetToRgbaString";
import { keywordsStringToKeywordsArray } from "./actions/keywordsStringToKeywordsArray";
type Props = {};

export const CatModal: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [modalForm] = Form.useForm();

  const createCategory = useCategoryStore((state) => state.createCategory);
  const editCategory = useCategoryStore((state) => state.editCategory);
  const formInitialData = useCategoryStore((state) => state.formInitialData);

  const resetFormInitialData = useCategoryStore(
    (state) => state.resetFormInitialData
  );

  const setIsModalOpen = useCategoryStore((state) => state.setIsModalOpen);
  const isModalOpen = useCategoryStore((state) => state.isModalOpen);
  const isEditing = useCategoryStore((state) => state.isEditing);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    resetFormInitialData();
    modalForm.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [successMessage]);

  const OnFinishHandler = (fieldsValue: any) => {
    setErrorMessage("");
    const id = isEditing ? formInitialData.id : Math.random().toString();
    const color = rgbaObjcetToRgbaString(fieldsValue.color.metaColor);
    const keywordArray = keywordsStringToKeywordsArray(fieldsValue.keywords);

    const unValidate = {
      id: id,
      title: fieldsValue.title,
      description: fieldsValue.description,
      keywords: keywordArray,
      color: color,
    };

    const validated = CategorySchema.safeParse(unValidate);

    if (!validated.success) {
      setErrorMessage(JSON.parse(validated.error.message)[0].message);
      return;
    }
    if (isEditing) {
      const editCatRequest = editCategory(validated.data);
      if (editCatRequest.ok) {
        setSuccessMessage(editCatRequest.message);
        modalForm.setFieldsValue(fieldsValue);
      } else {
        setErrorMessage(editCatRequest.message);
        sessionStorage.removeItem("category");
      }
    } else {
      const setCatRequest = createCategory(validated.data);
      if (setCatRequest.ok) {
        setSuccessMessage(setCatRequest.message);
        modalForm.resetFields();
      } else {
        setErrorMessage(setCatRequest.message);
        sessionStorage.removeItem("category");
      }
    }
  };

  useEffect(() => {
    modalForm.setFieldsValue(formInitialData);
  }, [formInitialData, modalForm]);

  return (
    <div>
      <Modal
        title={isEditing ? "Edit Category" : "Create new Category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        {successMessage && (
          <div className="bg-green-700 w-full px-2 py-1 bg-opacity-45 text-center absolute left-0 top-0">
            <span className="text-slate-200 capitalize">{successMessage}</span>
          </div>
        )}
        <Form
          initialValues={formInitialData}
          form={modalForm}
          style={{ maxWidth: 500 }}
          layout="vertical"
          onFinish={OnFinishHandler}
        >
          <Form.Item
            label={"Title"}
            name={"title"}
            rules={[
              {
                pattern: lowLevelRegex,
                required: true,
                message: "Enter Title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                pattern: lowLevelRegex,
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Keywords"
            name="keywords"
            rules={[
              {
                pattern: lowLevelRegex,
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea placeholder="use , between" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Color",
              },
            ]}
            label="Color"
            name={"color"}
          >
            <ColorPicker size="large" className="w-full" />
          </Form.Item>
          <div className="flex gap-2">
            <Button
              htmlType="reset"
              className="w-full bg-cyan-600 capitalize"
              onClick={handleCancel}
            >
              {isEditing ? "cancel" : "close"}
            </Button>
            <Form.Item className="w-full">
              <Button
                className="bg-lime-700 font-medium w-full capitalize"
                type="default"
                htmlType="submit"
              >
                {isEditing ? "save" : "create"}
              </Button>
            </Form.Item>
          </div>
        </Form>
        {errorMessage && (
          <div className="bg-red-700 w-full px-2 py-1 bg-opacity-45 text-center">
            <span className="text-slate-200 capitalize">{errorMessage}</span>
          </div>
        )}
      </Modal>
    </div>
  );
};
