class Bet < ApplicationRecord
    belongs_to :user
    belongs_to :game
    has_many :comments
    validates :category, presence: true
    validates :description, presence: true
    validates :odds, presence: true
end