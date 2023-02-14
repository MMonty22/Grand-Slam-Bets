class GameSerializer < ActiveModel::Serializer
    attributes :id, :away_team, :home_team
    has_many :bets
    has_many :hitters
    has_many :pitchers
end