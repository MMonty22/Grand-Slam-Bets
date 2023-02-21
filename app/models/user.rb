class User < ApplicationRecord
    has_many :bets
    has_many :games, through: :bets
    has_many :comments
    has_secure_password
    validates :username, uniqueness: true

    def initialize(wins = 0, losses = 0)
        @wins = wins
        @losses = losses
    end
end