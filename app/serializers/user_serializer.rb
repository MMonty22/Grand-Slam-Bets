class UserSerializer < ActiveModel::Serializer
    attributes :id, :username
    has_many :bets
    has_many :comments
end