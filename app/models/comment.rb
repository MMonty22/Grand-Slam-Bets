class Comment < ApplicationRecord
    belongs_to :bet
    belongs_to :user
    validates :text, presence: true
    validates :text, length: {maximum: 150}
end