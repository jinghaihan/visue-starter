<script lang="ts" setup>
import { message } from 'ant-design-vue'

definePage({
  meta: {
    name: 'component-library',
    keepAlive: true,
  },
})

function showMessage(api: 'info' | 'success' | 'error' | 'warning') {
  message[api](`This is a ${api} message`)
}
</script>

<template>
  <div flex flex-col items-center gap-16>
    <ASpace wrap>
      <AButton type="primary" @click="showMessage('success')">
        Success
      </AButton>
      <AButton type="primary" danger @click="showMessage('error')">
        Error
      </AButton>
      <AButton type="dashed" @click="showMessage('info')">
        Info
      </AButton>
      <AButton type="dashed" @click="showMessage('warning')">
        Warning
      </AButton>
    </ASpace>

    <AEmpty />
  </div>
</template>
