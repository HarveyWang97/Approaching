module.exports = {
  fields: {
    item: [
        'description',
        'expireDate',
        'location',
        'quantity',
        'eventList'
    ],
    event: [
        'description',
        'time',
        'location',
        'itemList'
    ]
  },
  icons: {
    description: 'file-alt',
    time: 'clock',
    expireDate: 'clock',
    location: 'map-marker-alt',
    itemList: 'list-ul',
    eventList: 'calendar-alt'
  }
}
