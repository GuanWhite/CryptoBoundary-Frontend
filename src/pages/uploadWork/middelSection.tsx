import {
  Center,
  Heading,
  HStack,
  IconButton,
  Input,
  Span,
  VStack,
} from '@chakra-ui/react';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from './components/ui/file-button';
import { InputGroup } from './components/ui/input-group';
import {
  BirthdayIcon,
  ChartIcon,
  CodeIcon,
  EnterIcon,
  IllustrationIcon,
  UploadIcon,
} from './icons/other-icons';
import { useState } from 'react';
import { Button } from './components/ui/button';

interface PromptButtonProps {
  icon?: React.ReactElement;
  description: string;
}

function PromptButton(props: PromptButtonProps) {
  const { icon, description } = props;
  return (
    <Button variant='outline' borderRadius='full'>
      {icon}
      <Span color='fg.subtle'>{description}</Span>
    </Button>
  );
}

export function MiddleSection() {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <Center flex='1'>
      <VStack gap='6'>
        <Heading size='3xl'>What can I help with?</Heading>
        <Center>
          <InputGroup
            minW='768px'
            startElement={
              <FileUploadRoot>
                <FileUploadTrigger asChild>
                  <UploadIcon fontSize='2xl' color='fg' />
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            }
            endElement={
              <IconButton
                fontSize='2xl'
                size='sm'
                borderRadius='full'
                disabled={inputValue.trim() === ''}
              >
                <EnterIcon fontSize='2xl' />
              </IconButton>
            }
          >
            <Input
              placeholder='Message ChatGPT'
              variant='subtle'
              size='lg'
              borderRadius='3xl'
              value={inputValue}
              onChange={handleInputValue}
            />
          </InputGroup>
        </Center>

        <HStack gap='2'>
          <PromptButton
            icon={<IllustrationIcon color='green.500' fontSize='lg' />}
            description='Create image'
          />
          <PromptButton
            icon={<CodeIcon color='blue.500' fontSize='lg' />}
            description='Code'
          />
          <PromptButton
            icon={<ChartIcon color='cyan.400' fontSize='lg' />}
            description='Analyze data'
          />
          <PromptButton
            icon={<BirthdayIcon color='cyan.400' fontSize='lg' />}
            description='Surprise'
          />
          <PromptButton description='More' />
        </HStack>
      </VStack>
    </Center>
  );
}