import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      children: [
        {
          path: '/registration',
          name: 'registration',
          component: () => import('@/components/landing/RegistrationDialog.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/components/landing/LoginDialog.vue')
        },
        {
          path: '/verify-email',
          name: 'verify-email',
          component: () => import('@/components/landing/email/VerifyEmail.vue')
        },
        {
          path: '/email-verified',
          name: 'email-verified',
          props: (route) => ({
            verificationUrl: route.query.verification_url
          }),
          component: () => import('@/components/landing/email/EmailVerified.vue')
        },
        {
          path: '/expired-email/:token',
          name: 'expired-email',
          props: true,
          component: () => import('@/components/landing/email/ExpiredLinkEmail.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/components/landing/password/ForgotPassword.vue')
        },
        {
          path: '/new-password',
          name: 'new-password',
          component: () => import('@/components/landing/password/NewPassword.vue')
        },
        {
          path: '/confirm-password',
          name: 'confirm-password',
          component: () => import('@/components/landing/password/ConfirmPassword.vue')
        },
        {
          path: '/success-password',
          name: 'success-password',
          component: () => import('@/components/landing/password/SuccessPassword.vue')
        },
        {
          path: '/expired-password/:token/:email',
          name: 'expired-password',
          props: true,
          component: () => import('@/components/landing/password/ExpiredPassword.vue')
        }
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountPage.vue'),
      redirect: { path: '/news-feed' },
      children: [
        {
          path: '/news-feed',
          name: 'news-feed',
          component: () => import('@/views/NewsFeedPage.vue'),
          children: [
            {
              path: 'add-quote',
              name: 'news-feed-quote',
              component: () => import('@/components/news-feed/create-quote/QuoteForm.vue')
            }
          ]
        },
        {
          path: '/movie-list',
          name: 'movie-list',
          component: () => import('@/views/MovieListPage.vue'),
          children: [
            {
              path: 'add',
              name: 'add-movie',
              component: () => import('@/components/movie-list/add/AddMovie.vue')
            },
            {
              path: 'edit/:id',
              name: 'edit-movie',
              component: () => import('@/components/movie-list/edit/EditMovie.vue')
            }
          ]
        },
        {
          path: '/movie-description/:id',
          name: 'movie-description',
          component: () => import('@/views/MovieDescription.vue'),
          children: [
            {
              path: 'add',
              name: 'add-quote',
              component: () => import('@/components/quotes/add/AddQuote.vue')
            },
            {
              path: 'view/:quoteId',
              name: 'view-quote',
              component: () => import('@/components/quotes/view/ViewQuote.vue')
            },
            {
              path: 'edit/:quoteId',
              name: 'edit-quote',
              component: () => import('@/components/quotes/edit/EditQuote.vue')
            }
          ]
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/ProfilePage.vue'),
          children: [
            {
              path: 'update-email',
              name: 'update-email',
              component: () => import('@/components/user-profile/UpdateEmail.vue')
            }
          ]
        }
      ]
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/error-pages/NotFound.vue')
    },
    {
      path: '/403',
      name: 'access-forbidden',
      component: () => import('@/views/error-pages/AccessForbidden.vue')
    }
  ]
})

export default router
