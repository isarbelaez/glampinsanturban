export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos de commits permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva funcionalidad
        'fix', // Corrección de bug
        'docs', // Solo documentación
        'style', // Cambios que no afectan el significado (espacios, formato)
        'refactor', // Refactorización sin feat ni fix
        'perf', // Mejoras de rendimiento
        'test', // Añadir o corregir tests
        'build', // Cambios en el build system o dependencias externas
        'ci', // Cambios en archivos CI/CD
        'chore', // Otras tareas (no modifica src ni test)
        'revert', // Revert de commit anterior
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
  },
};
