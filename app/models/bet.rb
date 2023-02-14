class Bet < ApplicationRecord
    belongs_to :user
    belongs_to :game
    has_many :comments
end