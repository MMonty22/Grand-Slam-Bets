class BetSerializer < ActiveModel::Serializer
    attributes :id, :game_id, :category, :description, :odds
    has_many :comments
    belongs_to :user
end