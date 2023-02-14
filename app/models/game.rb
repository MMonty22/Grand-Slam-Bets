class Game < ApplicationRecord
    has_many :bets
    has_many :comments, through: :bets
    has_many :hitters
    has_many :pitchers
end