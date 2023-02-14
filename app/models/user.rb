class User < ApplicationRecord
    has_many :bets
    has_many :games, through: :bets
    has_many :comments
    has_secure_password
end