<template>
    <div class="dog-popup">
        <h1>Random Dog Image</h1>
        <div class="content">
            <button @click="fetchDogImage" class="btn">Get New Dog Image</button>
            <div v-if="loading" class="loader"></div>
            <div v-if="error" class="error">{{ error }}</div>

            <div class="image-container">
                <img v-if="dogImage" :src="dogImage" alt="Random Dog" class="dog-image" />
            </div>
        </div>
    </div>
</template>

<script>
import { fetchDogImage as getDogImageFromService } from '../services/dogServices'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const dogImage = ref('')
        const loading = ref(false)
        const error = ref(null)

        const fetchDogImage = async () => {
            loading.value = true
            error.value = null

            try {
                const {
                    dogImage: newDogImage,
                    error: fetchError,
                    loading: loadingState
                } = await getDogImageFromService()
                dogImage.value = newDogImage
                error.value = fetchError
                loading.value = loadingState
            } catch (err) {
                error.value = 'An unexpected error occurred'
                console.log('Error:', err)
            }
        }

        onMounted(() => {
            fetchDogImage()
        })

        return {
            dogImage,
            loading,
            error,
            fetchDogImage
        }
    }
}
</script>

<style scoped>
.dog-popup {
    text-align: center;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: auto;
    font-family: 'Arial', sans-serif;
}

h1 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-container {
    width: 300px;
    height: 250px;
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-top: 15px;
    padding: 10px;
}

.dog-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
}

.error {
    color: red;
    font-size: 0.9rem;
    margin-top: 10px;
}

.btn {
    background-color: #3baa3f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.btn:hover {
    background-color: #3d4e3e;
}

.loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #4caf50;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin-top: 15px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
