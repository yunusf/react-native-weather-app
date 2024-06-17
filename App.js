import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'

import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'

export default function App() {
  // Definisikan state "weatherData" dan "setWeatherData"
  const [weatherData, setWeatherData] = useState()

  const [status, setStatus] = useState('')

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size={"large"} />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
      default:
        return
    }
  }
  
  // Perbarui function searchWeather dengan menggunakan axios
  const searchWeather = (location) => {
    setStatus('loading')
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then(response => {
        const data = response.data
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15 // konversi kelvin ke celcius
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        setStatus('success')
      })
      .catch(err => setStatus('error'))
  }

  return (
    <View style={styles.container}>
      {/* Berikan function searchWeather ke component weatherSearch */}
      <WeatherSearch searchWeather={searchWeather} />

      {/* Tampilkan data cuaca ketika ada weatherData */}
      {/* {weatherData && <WeatherInfo weatherData={weatherData} />} */}
      <View style={styles.marginTop20}>{ renderComponent() }</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  marginTop20: {
    marginTop: 20,
  }
})