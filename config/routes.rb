Rails.application.routes.draw do
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :games, only: [:index, :create]
  resources :users, only: [:index, :create, :show]
  resources :comments, only: [:index, :create, :update, :destroy]
  resources :bets, only: [:index, :create, :update, :destroy]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end