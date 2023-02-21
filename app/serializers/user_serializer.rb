class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :wins, :losses
    has_many :bets
    has_many :comments
end