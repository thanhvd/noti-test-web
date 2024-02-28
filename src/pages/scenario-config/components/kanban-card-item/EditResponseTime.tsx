import { Form, InputNumber, Modal, Space, Typography } from 'antd';
import { FC } from 'react';

const { Paragraph } = Typography;

export const EditResponseTime: FC<any> = ({
  open,
  onOk,
  onCancel,
  stepData,
  updateStepData,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            updateStepData(values);
            onOk();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      {' '}
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          responseTimeHour: stepData.responseTimeHour,
          responseTimeMin: stepData.responseTimeMin,
          responseTimeSecond: stepData.responseTimeSecond,
        }}
      >
        {/* <Title level={5}>{"Repsonse time"}</Title> */}
        <Paragraph>{'Repsonse time'}</Paragraph>
        <Space direction='horizontal'>
          <Form.Item label={'Hour'} name={['responseTimeHour']}>
            <InputNumber />
          </Form.Item>
          <Form.Item label={'Minute'} name={['responseTimeMin']}>
            <InputNumber />
          </Form.Item>
          <Form.Item label={'Second'} name={['responseTimeSecond']}>
            <InputNumber />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
