class CommentSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :bet_id, :text, :created_at
    belongs_to :user
    belongs_to :bet
end