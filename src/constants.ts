import { SurveyData } from './types'

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockData: SurveyData = {
  "surveys": [
    {
      "id": 1,
      "title": "Опрос субъектов малого и среднего предпринимательства в отношении доступности финансовых услуг",
      "description": "Банк России проводит опрос среди представителей малого и среднего предпринимательства – юридических лиц для определения уровня востребованности финансовых услуг, удовлетворенности этими услугами и работой российских финансовых организаций, предоставляющих эти услуги.",
      "expirationDate": "2019-11-01T00:00:00.000Z",
      "sections": [
        {
          "blocks": [
            {
              "type": "title",
              "text": "1. Укажите адрес вашей электронной почты",
            },
            {
              "type": "shortAnswer",
              "placeholder": "Введите свой e-mail",
              "required": true,
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "2. Какими финансовыми услугами пользовалась Ваша организация за последние 12 месяцев (с 3 квартала 2018 г.), включая те, что используются сейчас?",
            },
            {
              "type": "description",
              "text": "Выберите все подходящие варианты ответов",
            },
            {
              "type": "checkboxes",
              "items": [
                "Рассчетно-кассовое обслуживание (РКО)",
                "Открытие расчётного счета",
                "Зарплатные проекты",
                "Экспортно-импортные валютно-обменные операции",
              ],
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "3. Каков основной вид деятельности Вашей организации?",
            },
            {
              "type": "description",
              "text": "Выберите наиболее близкий вариант ответа",
            },
            {
              "type": "radiobuttons",
              "items": [
                "Сельское хозяйство",
                "Рыболовство",
                "Добыча полезных ископаемых",
                "Обрабатывающие производства",
              ],
              "required": true,
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "4. В каком субъекте Российской Федерации расположено основное место ведения Вашей деятельности?",
            },
            {
              "type": "description",
              "text": "Субьект РФ",
            },
            {
              "type": "dropdown",
              "items": [
                "Москва",
                "Московская область",
                "Краснодарский край",
                "Санкт-Петербург",
                "Свердловская область",
                "Ростовская область",
                "Республика Башкортостан",
                "Республика Татарстан",
              ],
              "required": true,
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "5. Как вам такой внешний вид офиса Банка России?",
            },
            {
              "type": "image",
              "text": "http://novosti-saratova.ru/wp-content/uploads/2015/11/92535.jpg",
            },
            {
              "type": "radiobuttons",
              "items": [
                "Очень нравится",
                "Нормально",
                "Совсем не нравится",
              ],
              "other": "Замечание",
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "6. Как вам расположение этого офиса Банка России?",
            },
            {
              "type": "geoData",
              "lat": 55.789149,
              "lng": 49.118568,
            },
            {
              "type": "paragraph",
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "7. Посмотрите видео с новой рекламой Банка России, как вам?",
            },
            {
              "type": "video",
              "text": "https://www.youtube.com/watch?v=e39RDJ3PDWM",
            },
            {
              "type": "radiobuttons",
              "items": [
                "Очень нравится",
                "Нормально",
                "Совсем не нравится",
              ],
              "other": "Замечание",
            },
          ],
        },
        {
          "blocks": [
            {
              "type": "title",
              "text": "8. Какая купюра вам больше всего нравится по внешнему виду?",
            },
            {
              "type": "description",
              "text": "a. Купюра номиналом 200 ₽",
            },
            {
              "type": "image",
              "text": "https://www.dropbox.com/s/g8eqmyl4ponbfny/bill1.png",
            },
            {
              "type": "description",
              "text": "б. Купюра номиналом 1 000 ₽",
            },
            {
              "type": "image",
              "text": "https://www.dropbox.com/s/h0bqlb6tkhxama3/bill2.png",
            },
            {
              "type": "description",
              "text": "в. Купюра номиналом 2 000 ₽",
            },
            {
              "type": "image",
              "text": "https://www.dropbox.com/s/ococnw9sp40m783/bill3.png",
            },
            {
              "type": "description",
              "text": "г. Купюра номиналом 100 ₽ к Олимпиаде в Сочи",
            },
            {
              "type": "image",
              "text": "https://www.dropbox.com/s/1rojqe6sgexsdsd/bill4.png",
            },
            {
              "type": "radiobuttons",
              "items": [
                "a. 200 ₽",
                "б. 1 000 ₽",
                "в. 2 000 ₽",
                "г. 100 ₽ к Олимпиаде в Сочи",
              ],
            },
          ],
        },
      ],
    },
    {
      "id": 2,
      "title": "Выбор символа рубля",
      "description": "Какой символ рубля вы считаете наиболее подходящим?",
      "expirationDate": "2020-01-01T00:00:00.000Z",
      "sections": [
        {
          "blocks": [
            {
              "type": "title",
              "text": "Какой символ рубля больше подходит?",
            },
            {
              "type": "image",
              "text": "https://bankirsha.com/files/pic/r5.png",
            },
            {
              "type": "radiobuttons",
              "items": [
                "Вариант 1",
                "Вариант 2",
                "Вариант 3",
                "Вариант 4",
                "Вариант 5",
              ],
              "required": true,
            },
          ],
        },
      ],
    },
  ],
}

