class Bet < ApplicationRecord
    belongs_to :user
    belongs_to :game
    has_many :comments, dependent: :destroy
    validates :category, presence: true
    validates :description, presence: true
    validates :odds, presence: true

    def calc_user_record(current_user)
        if self.result == "win"
            current_user.update(wins: current_user.wins +=1)
        elsif self.result == "loss"
            current_user.update(losses: current_user.losses +=1)
        end
    end
end