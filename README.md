# Node.js CLI Calculator 

## Описание

Консольный калькулятор, который принимает входную строку, содержащую математическое выражение и выводит в консоль результат его вычисления. Задание предполагает самостоятельную реализацию парсинга и расчета математического выражения.

## Установка

1. Установить [node.js](http://nodejs.org/download/)
2. Инициировать менеджер пакетов, включающий [readline](https://www.npmjs.com/package/readline) для работы со строками консоли node:
``` 
npm i
```
3. Начать работу c консольным калькулятором: 
```
node index
```

## Использование

- простые математические выражения с целыми числами (+, -, *, /)

```
123+321-123*2/10
```

- десятично-дробные числа

```
2.212+3.313*4.4
```

- скобки
```
(2/1)+2+(2*2)
```

## Tестирование

При разработке использовались принципы TDD и SOLID. Архитектура решения должна обеспечивать расширение списка поддерживаемых операций при минимальном и максимально безболезненном для существующей функциональности внесении изменений в исходный код. Код должен быть легко читаем и отформатирован в едином стиле, содержать минимальное число поясняющих комментариев.

Для проведения теста с фреймворком [Jest](https://jestjs.io/) необходимо запустить команду:

```
npm run test
```



