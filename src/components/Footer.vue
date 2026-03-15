<template>
  <v-footer class="margin-auto pl-8 pt-4 pb-4 bg-base-l-2 footer">
    <div class="info text-base-d-1">
      Copyright &copy;{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block mx-2">• Consnaval</span>
      |
      <a
        class="text-decoration-none mx-2 text-base-d-1"
        href="mailto:info@consnaval.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        info@consnaval.com
      </a>
      |
      <a
        class="text-decoration-none mx-2 text-base-d-1"
        href="tel:+34963354420"
        rel="noopener noreferrer"
        target="_blank"
        >96 335 44 20</a
      >
    </div>
  </v-footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgb(var(--v-theme-base-l-1));
}

.info {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
}

.info a:hover {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
