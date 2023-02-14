class Comment < ApplicationRecord
    belongs_to :bet
    belongs_to :user
end