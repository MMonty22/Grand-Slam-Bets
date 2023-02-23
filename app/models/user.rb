class User < ApplicationRecord
    has_many :bets
    has_many :games, through: :bets
    has_many :comments
    has_secure_password
    validates :username, uniqueness: true

    def assign_wins_losses
        self.update(wins: 0)
        self.update(losses: 0)
    end
end