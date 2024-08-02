import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    text: { control: 'text' },
    textColor: { control: 'color' },
  },
};

export const Default = (args) => <Button {...args} />;

// export const Primary = Template.bind({});