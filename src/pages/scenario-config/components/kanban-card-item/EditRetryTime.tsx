import { Form, InputNumber, Modal, Space, Typography } from 'antd';
import { FC } from 'react';

const { Paragraph } = Typography;

export const EditRetryTime: FC<any> = ({
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
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          numberRetry: stepData.numberRetry,
          delayRetryHour: stepData.delayRetryHour,
          delayRetryMin: stepData.delayRetryMin,
          delayRetrySecond: stepData.delayRetrySecond,
        }}
      >
        <Form.Item label={'Số lần retry'} name={['numberRetry']}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Paragraph>{'Thời gian mỗi lần retry'}</Paragraph>
        <Space direction='horizontal'>
          <Form.Item label={'Hour'} name={['delayRetryHour']}>
            <InputNumber />
          </Form.Item>
          <Form.Item label={'Minute'} name={['delayRetryMin']}>
            <InputNumber />
          </Form.Item>
          <Form.Item label={'Second'} name={['delayRetrySecond']}>
            <InputNumber />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
