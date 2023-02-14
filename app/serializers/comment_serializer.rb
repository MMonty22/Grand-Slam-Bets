class CommentSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :bet_id, :text
    belongs_to :user
    belongs_to :bet
end