import InputField from '../components/InputField';

export default {
  title: 'Components/Input',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    type: { control: 'text' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export const Default = (args) => <InputField {...args} />;
