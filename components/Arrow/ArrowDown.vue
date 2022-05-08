<template>
  <div>
    <svg
      v-if="!isActive"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.9493 0.949301L9.39933 0.399329L4.99993 4.79873L0.6006 0.3994L0.0506286 0.949371L4.44996 5.3487L4.44958 5.34908L4.99955 5.89905L4.99993 5.89867L5.00038 5.89912L5.55035 5.34915L5.5499 5.3487L9.9493 0.949301Z"
        fill="#151515"
      />
    </svg>

    <svg
      v-else-if="isActive"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.0506986 4.95011L0.600671 5.50009L5.00007 1.10069L9.3994 5.50001L9.94937 4.95004L5.55004 0.550713L5.55042 0.550338L5.00045 0.000365715L5.00007 0.000741327L4.99962 0.000294908L4.44965 0.550267L4.4501 0.550713L0.0506986 4.95011Z"
        fill="#151515"
      />
    </svg>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
div{
  position: relative;
}
</style>
