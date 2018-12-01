module.exports = {
  fields: {
    item: [
        'description',
        'expireDate',
        'location',
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
    eventList: 'calendar-alt',
    reminder: 'bell',
    email: 'envelope'
  },
  // the size should be consistent with the css styles for Popup top section
  picture: {
    width: 100,
    height: 30
  },
  layerOffset: { x: -80, y: 15 },
  useTestingAccount: true
}
