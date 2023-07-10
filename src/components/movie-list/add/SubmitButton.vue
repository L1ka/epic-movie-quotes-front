<template>
  <button @click="$emit('submit')" class="w-full mb-10 relative bg-base-red rounded py-3">
    {{ $t('add_movie.save') }}
  </button>
</template>
