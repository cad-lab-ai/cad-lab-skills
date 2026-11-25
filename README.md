# Инженерные пакеты cad-lab

Пакеты помогают агенту вести конструкторские и технологические задачи: проектировать детали и сборки, готовить и проверять чертежи, составлять маршрутные и операционные карты.

**[Скачать cad-lab для Windows](https://cad-lab.xyz/app/?utm_source=github&utm_medium=referral&utm_campaign=desktop_download&utm_content=cad-lab-skills#download)**

В приложении откройте «Маркетплейс» и выберите «Агенты», «Навыки» или «Сценарии». Каждый пакет имеет собственную версию. CAD-адаптеры доступны в разделе «Плагины».

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

Для учебных маршрутных карт доступен [паспорт вымышленного завода «СеверНефтеОснастка» версии 1.1](docs/examples/manufacturing/factory-oilfield-tooling-v1.1.md).
