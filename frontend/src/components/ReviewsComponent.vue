<script>
import api from '@/api/client'; 

export default {
  data() {
    return {
      feedbacks: [],     
      name: '',          
      review: '',        
      errorMessage: '',  
    };
  },
  methods: {
    // Отримання відгуків (GET)
    async loadFeedbacks() {
      this.errorMessage = '';
      try {
        const { data } = await api.get('/api/reviews');
        this.feedbacks = Array.isArray(data) ? data : [];
      } catch (e) {
        this.errorMessage = 'Не вдалося завантажити відгуки.';
        console.error(e);
      }
    },

    // Додавання відгуку (POST)
    async submitFeedback() {
      if (!this.name.trim() || !this.review.trim()) return;
      
      this.errorMessage = '';
      try {
        const payload = {
          user_name: this.name.trim(),
          comment: this.review.trim()
        };

        await api.post('/api/reviews', payload);
        this.name = '';
        this.review = '';
        
        await this.loadFeedbacks(); 
      } catch (e) {
        this.errorMessage = 'Помилка при збереженні.';
        console.error(e);
      }
    },

    // ПРАВИЛЬНЕ ВИДАЛЕННЯ (Всередині методів)
    async deleteReview(id) {
      if (confirm('Ви впевнені, що хочете видалити цей відгук?')) {
        try {
          await api.delete(`/api/reviews/${id}`);
          
          // Оновлюємо масив feedbacks
          this.feedbacks = this.feedbacks.filter(item => item.id !== id);
          
          alert('Відгук видалено');
        } catch (error) {
          console.error("Помилка видалення:", error);
          alert('Не вдалося видалити. Можливо, на сервері немає такого ID.');
        }
      }
    }
  },
  mounted() {
    this.loadFeedbacks();
  }
};
</script>

<template>
  <section class="container my-5 text-white" id="reviews" data-aos="fade-up">
    <div class="row">
      <div class="col-md-6">
        <h2 class="section-title">Залишити відгук</h2>
        <form @submit.prevent="submitFeedback" class="bg-dark p-4 rounded border border-gold shadow">
          <div class="mb-3">
            <label class="form-label text-warning">Ваше ім'я</label>
            <input v-model="name" type="text" class="form-control" placeholder="Як вас звати?" required>
          </div>
          <div class="mb-3">
            <label class="form-label text-warning">Ваше послання</label>
            <textarea v-model="review" class="form-control" rows="4" placeholder="Напишіть ваші враження від подорожі" required></textarea>
          </div>
          <button type="submit" class="btn btn-outline-warning w-100 mt-2">
            Надіслати відгук
          </button>
        </form>
      </div>

      <div class="col-md-6">
        <h2 class="section-title">Відгуки мандрівників</h2>
        <p v-if="errorMessage" class="text-danger small">{{ errorMessage }}</p>
        
        <div v-if="feedbacks.length === 0" class="text-muted italic">
          Відгуків поки немає. Будьте першим!
        </div>

        <div class="reviews-list mt-3" style="max-height: 450px; overflow-y: auto;">
          <article v-for="item in feedbacks" :key="item.id" class="bg-dark p-3 mb-3 border-start border-warning border-3 rounded shadow-sm">
            <h5 class="text-warning mb-1">{{ item.user_name }}</h5>
            <p class="mb-0 text-light opacity-75">{{ item.comment }}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-2">
              <small class="text-muted" style="font-size: 0.7rem;">
                {{ new Date(item.created_at).toLocaleString() }}
              </small>

              <button 
                @click="deleteReview(item.id)" 
                class="btn btn-sm btn-outline-danger" 
                style="font-size: 0.65rem; padding: 2px 8px; text-transform: uppercase; letter-spacing: 0.5px;"
              >
                Видалити
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.border-gold {
  border: 1px solid #D2BD6B !important;
}
.section-title {
  border-bottom: 2px solid #D2BD6B;
  display: inline-block;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.form-control {
  background-color: #1a1a1a;
  border: 1px solid #444;
  color: white;
}
.form-control:focus {
  background-color: #222;
  border-color: #D2BD6B;
  color: white;
  box-shadow: 0 0 5px rgba(210, 189, 107, 0.5);
}
/* Стиль для скролбару */
.reviews-list::-webkit-scrollbar {
  width: 5px;
}
.reviews-list::-webkit-scrollbar-thumb {
  background: #D2BD6B;
  border-radius: 10px;
}
</style>