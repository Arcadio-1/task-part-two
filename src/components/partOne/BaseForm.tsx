import React from "react";
import { ColorPicker, Select } from "antd";
import { useCategoryStore } from "./lib/useCategoryStore";
import { Button, Form } from "antd";

export const BaseForm: React.FC = () => {
  const setIsModalOpen = useCategoryStore((state) => state.setIsModalOpen);
  const getCategorys = useCategoryStore((state) => state.getCategorys);
  const categorys = useCategoryStore((state) => state.categorys);
  const setFormInitialData = useCategoryStore(
    (state) => state.setFormInitialData
  );
  const resetFormInitialData = useCategoryStore(
    (state) => state.resetFormInitialData
  );

  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const createNewCategory = () => {
    resetFormInitialData();
    showModal();
  };

  const editHandler = (fieldsValue: { catId: string }) => {
    setFormInitialData(fieldsValue.catId);
    showModal();
  };

  return (
    <Form name="base" onFinish={editHandler} form={form}>
      <div className="flex flex-col gap-2">
        <label className="capitalize text-md">choose category :</label>
        <Form.Item
          name="catId"
          rules={[
            {
              required: true,
              message: "select cat first",
            },
          ]}
        >
          <Select
            className="w-full"
            placeholder="choose a category"
            onSelect={(e) => {
              setFormInitialData(e);
            }}
            onDropdownVisibleChange={() => {
              getCategorys();
            }}
            options={categorys.map((category) => ({
              value: category.id,
              label: (
                <div className="flex items-center justify-between">
                  <span>{category.title}</span>
                  <ColorPicker
                    className="cursor-default"
                    size="small"
                    value={category.color}
                    disabled
                  />
                </div>
              ),
            }))}
          />
        </Form.Item>
      </div>
      <div className="flex gap-2">
        <Button
          className="w-full bg-lime-700 capitalize"
          onClick={createNewCategory}
        >
          create new category
        </Button>
        <Form.Item className="w-full">
          <Button
            className="bg-cyan-600 font-medium w-full capitalize"
            type="default"
            htmlType="submit"
          >
            edit category
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
