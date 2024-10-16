import axios from 'axios'

export async function fetchDogImage() {
    let dogImage = ''
    let error = null
    let loading = true

    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random')
        dogImage = response.data.message
    } catch (err) {
        error = 'Failed to fetch dog image'
        console.log('Error:', err)
    } finally {
        loading = false
    }

    return { dogImage, error, loading }
}
