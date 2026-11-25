# Инженерные пакеты cad-lab

Репозиторий содержит общие навыки, профессии и сценарии. Каждый пакет имеет собственную версию. В приложении откройте «Маркетплейс» и выберите нужный раздел — «Агенты», «Навыки» или «Сценарии». CAD-адаптеры устанавливаются отдельно как плагины.

| Раздел | Пакет и его манифест |
|---|---|
| Агент | [Инженер-конструктор](cad-lab-design-engineer/skill-package.json) |
| Агент | [Технолог](cad-lab-manufacturing-engineer/skill-package.json) |
| Навык | [Подготовка чертежей](cad-lab-drawing-preparation/skill-package.json) |
| Навык | [Проверка чертежей](cad-lab-drawing-review/skill-package.json) |
| Навык | [Технический контроль КД](cad-lab-manufacturing-review/skill-package.json) |
| Навык | [Проектирование деталей и сборок](cad-lab-mechanical-design/skill-package.json) |
| Навык | [Построение операционной карты](cad-lab-operation-planning/skill-package.json) |
| Навык | [Построение маршрутной карты](cad-lab-route-planning/skill-package.json) |
| Сценарий | [Чертёж по 3D-модели](cad-lab-drawing-workflow/skill-package.json) |

## Установка

`bb skill package install cad-lab-design-engineer`

`bb skill package install cad-lab-drawing-review`

Профессия автоматически устанавливает обязательные навыки отдельными пакетами.
Любой навык можно установить самостоятельно; CAD-адаптеры устанавливаются отдельно
в разделе «Плагины». Удаление профессии сохраняет навыки. Отключение или удаление
обязательного навыка при включённой профессии блокируется с объяснением.

Команды `bb skill package list|update|enable|disable|remove` управляют теми же
пакетами, что интерфейс. SDK: `sdk.skills.packages.list()` и
`sdk.skills.packages.change({ id, action })`.

[Формат пакета, синхронизация профилей и выпуск](docs/package-format.md).
