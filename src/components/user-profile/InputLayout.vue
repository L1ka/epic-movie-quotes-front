<template>
  <div class="flex items-end lg:border-b-2 border-border w-full justify-between mb-8 lg:pb-4">
    <div class="flex flex-col w-full lg:w-[90%]">
      <slot></slot>
    </div>

    <button class="text-sm hidden lg:block">Save</button>
  </div>
</template>
