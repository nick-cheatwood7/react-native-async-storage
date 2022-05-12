import React from 'react';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  Text,
  Icon,
  Center,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  title?: string;
  actions?: JSX.Element;
}

const AppBar = ({ title, actions }: IProps) => {
  return (
    <Center flexDirection="row" backgroundColor={'muted.800'} safeAreaTop>
      <StatusBar />
      <Box safeAreaTop />
      <HStack
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems={'center'}
        w="100%"
      >
        {/* Menu button */}
        <HStack alignItems={'center'}>
          <IconButton
            icon={<Icon size="xl" as={Ionicons} name="menu" color="white" />}
          />
          {/* Label */}
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack>
          {/* Action buttons */}
          {actions}
        </HStack>
      </HStack>
    </Center>
  );
};

export default AppBar;
