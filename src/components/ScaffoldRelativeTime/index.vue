<template>
  <span
    v-if="timestamp"
    v-time="new Date(timestamp).getTime()"
  />
  <span v-else>{{ $t('nodata') }}</span>
</template>

<script>
export default {
  name: 'SwRelativeTime',
  props: {
    timestamp: {
      type: Number,
      required: true
    }
  }
}
</script>
