import { StyleSheet,  } from 'react-native'
import React from 'react'
import { Container } from '../Container'
import { Box, Spinner } from '@gluestack-ui/themed'
import { colors } from '../../themes'

const Loader = () => {
  return (
    <Container statusBarStyle='dark-content'>
    <Box flex={1} justifyContent='center' alignItems='center'>
      <Spinner size={'large'} color={colors.primary} />
    </Box>
  </Container>
  )
}

export default Loader

const styles = StyleSheet.create({})