window.addEventListener('load', () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let degreeSection = document.querySelector('.degree-section')
  const degreeSpan = document.querySelector('.degree-section span')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      // const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `https://api.darksky.net/forecast/483189563b91666dd847b0de765193ed/${lat},${long}`

      fetch(api)
        .then(res => {
          return res.json()
        })
        .then(data => {
          // console.log(data)
          const { temperature, summary, icon } = data.currently

          // Add text to DOM Element from API.
          locationTimezone.textContent = locationTimezoneFixed(data.timezone)
          temperatureDegree.textContent = temperature
          temperatureDescription.textContent = summary

          // Add icon
          setIcons(document.querySelector('.icon'), icon)

          // Converte Farenheit to Celsius
          let celsius = (temperature - 32) * (5 / 9)

          // Switch temperature to Celsius/Farenheit
          degreeSection.addEventListener('click', () => {
            if(degreeSpan.textContent === '°F') {
              degreeSpan.textContent = '°C'
              temperatureDegree.textContent = Math.floor(celsius)
            } else {
              degreeSpan.textContent = '°F'
              temperatureDegree.textContent = temperature
            }
          })
        })
    })
  }

  // Beautify locationTimezone text
  function locationTimezoneFixed (location) {
    return location.split('/').join(' / ').split('_').join(' ')
  }

  // Set icon from skycons
  function setIcons(iconID, icon) {
    const skycons = new Skycons({ "color": "white", "resizeClear": true })
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play()
    return skycons.add(iconID, Skycons[currentIcon])
  }
})